'use client'

import { startTransition, useEffect, useMemo, useOptimistic, useState } from 'react'

import { saveModelId } from '@/app/(chat)/actions'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Model } from '@/lib/ai/models'
import { cn } from '@/lib/utils'

import { CheckCircleFillIcon, ChevronDownIcon } from './icons'

export function ModelSelector( {
  selectedModelId,
  className,
  models,
  label,
}: {
  selectedModelId: string
  models: Array<Model>
  label: 'router' | 'reasoning'
} & React.ComponentProps<typeof Button> ) {
  const [open, setOpen] = useState( false )
  const [optimisticModelId, setOptimisticModelId] =
    useOptimistic( selectedModelId )

  const [activeModel, setActiveModel] = useState( selectedModelId )

  const selectedModel = useMemo(
    () => models.find( ( m ) => m.id === activeModel ),
    [activeModel],
  )

  useEffect( () => {
    setActiveModel( selectedModelId )
  }, [selectedModelId] )
  const modelType = label.includes( 'Reasoning' ) ? 'reasoning' : 'router'
  return (
    <div className="flex flex-row gap-1">
      {/* <label className="text-sm text-muted-foreground">{label}</label> */}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          asChild
          className={cn(
            'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
            className,
          )}
        >
          <Button variant="outline" className="md:px-2 md:h-[34px]">
            {selectedModel?.label}
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[300px]">
          <div className="px-2 py-1.5 text-sm text-muted-foreground">
            {label}
          </div>
          {models.map( ( model ) => {

            console.log( "🚀 ~ {models.map ~ model:", model )

            return (
              <DropdownMenuItem
                key={model.id}
                onSelect={() => {


                  startTransition( () => {
                    setOptimisticModelId( model.id )

                  } )
                  // setOptimisticModelId( model.id )
                  saveModelId( modelType, model.id )
                  setActiveModel( model.id )
                  setOpen( false )
                }}
                className="gap-4 group/item flex flex-row justify-between items-center"
                data-active={model.id === activeModel}
              >
                <div className="flex flex-col gap-1 items-start">
                  {model.label}
                  {model.description && (
                    <div className="text-xs text-muted-foreground">
                      {model.description}
                    </div>
                  )}
                </div>
                <div className="text-foreground dark:text-foreground opacity-0 group-data-[active=true]/item:opacity-100">
                  <CheckCircleFillIcon />
                </div>
              </DropdownMenuItem>
            )
          } )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
