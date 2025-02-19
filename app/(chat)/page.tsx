import { cookies } from 'next/headers'

import { Chat } from '@/components/chat'
import { DEFAULT_MODEL_NAME, models, reasoningModels, DEFAULT_REASONING_MODEL_NAME } from '@/lib/ai/models'
import { generateUUID } from '@/lib/utils'
import { DataStreamHandler } from '@/components/data-stream-handler'

export default async function Page() {
  const id = generateUUID()

  const cookieStore = await cookies()

  console.log( "🚀 ~ Page ~ cookieStore:", cookieStore )

  const modelIdFromCookie = cookieStore.get( 'router-model-id' )?.value

  console.log( "🚀 ~ Page ~ modelIdFromCookie:", modelIdFromCookie )


  const selectedModelId =
    models.find( ( model ) => model.id === modelIdFromCookie )?.id ||
    DEFAULT_MODEL_NAME

  const reasoningModelIdFromCookie = cookieStore.get( 'reasoning-model-id' )?.value

  console.log( "🚀 ~ Page ~ reasoningModelIdFromCookie:", reasoningModelIdFromCookie )
  const reasonModel = reasoningModels.find( ( model ) => model.id === reasoningModelIdFromCookie )

  console.log( "🚀 ~ Page ~ reasonModel:", reasonModel )


  const selectedReasoningModelId =

    reasoningModels.find( ( model ) => model.id === reasoningModelIdFromCookie )?.id || DEFAULT_REASONING_MODEL_NAME
  console.log( "🚀 ~ Page ~ selectedReasoningModelId:", selectedReasoningModelId )

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        selectedModelId={selectedModelId}
        selectedReasoningModelId={selectedReasoningModelId}
        selectedVisibilityType="private"
        isReadonly={false}
      />
      <DataStreamHandler id={id} />
    </>
  )
}
