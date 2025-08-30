"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@moneta-kit/ui/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "moneta:fixed moneta:inset-0 moneta:z-50 moneta:bg-black/50 moneta:data-[state=open]:animate-in moneta:data-[state=closed]:animate-out moneta:data-[state=closed]:fade-out-0 moneta:data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "moneta:bg-white moneta:dark:bg-slate-900 moneta:fixed moneta:top-[50%] moneta:left-[50%] moneta:z-50 moneta:grid moneta:w-full moneta:max-w-[calc(100%-2rem)] moneta:translate-x-[-50%] moneta:translate-y-[-50%] moneta:gap-4 moneta:rounded-lg moneta:border moneta:p-6 moneta:shadow-lg moneta:duration-200 moneta:sm:max-w-lg moneta:data-[state=open]:animate-in moneta:data-[state=closed]:animate-out moneta:data-[state=closed]:fade-out-0 moneta:data-[state=open]:fade-in-0 moneta:data-[state=closed]:zoom-out-95 moneta:data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="moneta:ring-offset-background moneta:focus:ring-ring moneta:data-[state=open]:bg-accent moneta:data-[state=open]:text-muted-foreground moneta:absolute moneta:top-4 moneta:right-4 moneta:rounded-xs moneta:opacity-70 moneta:transition-opacity moneta:hover:opacity-100 moneta:focus:ring-2 moneta:focus:ring-offset-2 moneta:focus:outline-hidden moneta:disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("moneta:flex moneta:flex-col moneta:gap-2 moneta:text-center moneta:sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "moneta:flex moneta:flex-col-reverse moneta:gap-2 moneta:sm:flex-row moneta:sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("moneta:text-lg moneta:leading-none moneta:font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("moneta:text-muted-foreground moneta:text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
