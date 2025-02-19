'use client'
import { memo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useWindowSize } from 'usehooks-ts'

import { ModelSelector } from '@/components/model-selector'
import { SidebarToggle } from '@/components/sidebar-toggle'
import { Button } from '@/components/ui/button'
import { PlusIcon } from './icons'
import { useSidebar } from './ui/sidebar'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import type { VisibilityType } from './visibility-selector'
import { VisibilitySelector } from './visibility-selector'
import { useDeepResearch } from '@/lib/deep-research-context'
import { models, reasoningModels } from '@/lib/ai/models'

// Added dedicated interface and removed "isReadonly" as it's unused.
interface ChatHeaderProps {
  chatId: string
  selectedModelId: string
  selectedReasoningModelId: string
  selectedVisibilityType: VisibilityType
}

function PureChatHeader( {
  chatId,
  selectedModelId,
  selectedReasoningModelId,
  selectedVisibilityType,
}: ChatHeaderProps ) {
  const router = useRouter()
  const { open } = useSidebar()
  const { width: windowWidth } = useWindowSize()
  const { clearState } = useDeepResearch()

  // Extracted the inline onClick callback into a memoized function.
  const handleNewChat = useCallback( () => {
    router.push( '/' )
    clearState()
    router.refresh()
  }, [router, clearState] )

  // Simplified condition for rendering the new chat button.
  const showNewChatButton = !open || windowWidth < 768

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />

      {showNewChatButton && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
              onClick={handleNewChat}
            >
              <PlusIcon />
              <span className="md:sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
      )}

      <ModelSelector
        label="Router Model"
        models={models}
        selectedModelId={selectedModelId}
        className="order-1 md:order-2"
      />

      <ModelSelector
        label="Reasoning Model"
        models={reasoningModels}
        selectedModelId={selectedReasoningModelId}
        className="order-1 md:order-2"
      />

      <VisibilitySelector
        chatId={chatId}
        selectedVisibilityType={selectedVisibilityType}
        className="order-1 md:order-3"
      />

      {/* <Button
        className="bg-orange-500 dark:bg-zinc-100 hover:bg-orange-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 hidden md:flex py-1.5 px-2 h-fit md:h-[34px] order-4 md:ml-auto"
        asChild
      >
        <Link
          href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnickscamara%2Fextract-chat&env=AUTH_SECRET,OPENAI_API_KEY&envDescription=Learn%20more%20about%20how%20to%20get%20the%20API%20Keys%20for%20the%20application&envLink=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot%2Fblob%2Fmain%2F.env.example&demo-title=AI%20Chatbot&demo-description=An%20Open-Source%20AI%20Chatbot%20Template%20Built%20With%20Next.js%20and%20the%20AI%20SDK%20by%20Vercel.&demo-url=https%3A%2F%2Fchat.vercel.ai&stores=%5B%7B%22type%22:%22postgres%22%7D,%7B%22type%22:%22blob%22%7D%5D"
          target="_noblank"
        >
          <VercelIcon size={16} />
          Deploy with Vercel
        </Link>
      </Button> */}
    </header>
  )
}

export const ChatHeader = PureChatHeader