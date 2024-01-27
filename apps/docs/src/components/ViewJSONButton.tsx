import { Code2, X } from 'lucide-react'
import {
  TooltipTrigger,
  Tooltip,
  Button,
  OverlayArrow,
  DialogTrigger,
  Dialog,
  Modal,
} from 'react-aria-components'
import CopyButton from './CopyButton'

type ViewJSONButtonProps = {
  id: string
  title?: string
  json: any
}

const ViewJSONButton = ({ id, title, json }: ViewJSONButtonProps) => {
  return (
    <DialogTrigger>
      <TooltipTrigger delay={1000}>
        <Button className="bg-white hover:bg-gray-200 size-8 flex items-center justify-center rounded-lg border">
          <Code2 size={24} />
        </Button>
        <Tooltip
          className="bg-white/90 text-sm py-1 px-2 rounded-lg"
          offset={4}
          placement="end"
        >
          <OverlayArrow />
          <span>View JSON</span>
        </Tooltip>
      </TooltipTrigger>
      <Modal
        isDismissable
        isKeyboardDismissDisabled
        className="fixed inset-0 flex justify-center items-center bg-black/20 z-50"
      >
        <Dialog
          className="bg-white w-full max-w-screen-sm mx-4 p-6 rounded-lg z-[99]"
          data-id={id}
        >
          {({ close }) => (
            <>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-2xl">{title}</h3>
                <button onClick={close}>
                  <X />
                </button>
              </div>
              <div className="mt-4">
                <div className="flex flex-col gap-8">
                  <div className="gap-8 flex-col block">
                    <div className="not-prose bg-[#0F1117] dark:bg-codeblock rounded-xl dark:ring-1 dark:ring-gray-800/50 relative">
                      <div
                        className="flex text-xs bg-black/40 leading-6 rounded-t-xl border-b border-gray-900/80"
                        role="tablist"
                        aria-orientation="horizontal"
                      >
                        <div className="flex overflow-x-auto">
                          <button
                            className="group flex items-center relative px-2 pt-2.5 pb-2 text-gray-400 outline-none whitespace-nowrap font-medium text-primary-light"
                            id="headlessui-tabs-tab-:rg:"
                            role="tab"
                            type="button"
                            aria-selected="true"
                            data-headlessui-state="selected"
                            aria-controls="headlessui-tabs-panel-:rh:"
                          >
                            <div className="px-2 rounded-md">
                              <div className="z-10">Flex Message JSON</div>
                            </div>
                            <div className="pointer-events-none absolute inset-0 border-b border-primary-light"></div>
                          </button>
                        </div>
                        <div className="flex-auto flex justify-end items-center pr-4 rounded-tr">
                          <CopyButton text={JSON.stringify(json, null, 2)} />
                        </div>
                      </div>
                      <div className="flex overflow-auto max-h-96">
                        <div
                          className="flex-none text-gray-50 p-5 min-w-full overflow-x-auto text-xs leading-[1.35rem]"
                          id="headlessui-tabs-panel-:rh:"
                          role="tabpanel"
                          data-headlessui-state="selected"
                          aria-labelledby="headlessui-tabs-tab-:rg:"
                        >
                          <span>
                            <pre className="language-jsx">
                              <code className="language-jsx">
                                {JSON.stringify(json, null, 2)}
                              </code>
                            </pre>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}

export default ViewJSONButton
