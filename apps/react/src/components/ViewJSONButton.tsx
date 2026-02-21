import { Code2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import CopyButton from './CopyButton'

interface ViewJSONButtonProps {
  id: string
  title?: string
  json: any
}

function ViewJSONButton({ id, title, json }: ViewJSONButtonProps) {
  return (
    <Dialog>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-white hover:bg-gray-100 flex items-center justify-center shrink-0"
            >
              <Code2 className="size-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={4}>
          <p>View JSON</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-screen-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Tabs defaultValue="json" className="w-full">
            <div className="flex bg-green-50 rounded-t-xl border-b items-center justify-between">
              <TabsList className="bg-transparent h-10 p-0 overflow-x-auto justify-start rounded-b-none overflow-hidden pb-0">
                <TabsTrigger
                  value="json"
                  className="rounded-none rounded-tl-xl border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:text-primary-dark font-medium h-10 text-xs px-4"
                >
                  Flex Message JSON
                </TabsTrigger>
              </TabsList>
              <div className="flex-auto flex justify-end items-center pr-4">
                <CopyButton text={JSON.stringify(json, null, 2)} />
              </div>
            </div>

            <TabsContent value="json" className="mt-0 outline-none">
              <div className="bg-white dark:bg-codeblock rounded-b-xl border border-t-0 p-5 max-h-96 overflow-auto custom-scrollbar">
                <pre className="language-jsx text-xs text-slate-900 leading-[1.35rem]">
                  <code>{JSON.stringify(json, null, 2)}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewJSONButton
