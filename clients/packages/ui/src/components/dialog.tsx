"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@anyhive/ui/lib/utils"

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
        "anyhive:fixed anyhive:inset-0 anyhive:z-50 anyhive:bg-black/50 anyhive:data-[state=open]:animate-in anyhive:data-[state=closed]:animate-out anyhive:data-[state=closed]:fade-out-0 anyhive:data-[state=open]:fade-in-0",
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
          "anyhive:bg-white anyhive:dark:bg-slate-900 anyhive:fixed anyhive:top-[50%] anyhive:left-[50%] anyhive:z-50 anyhive:grid anyhive:w-full anyhive:max-w-[calc(100%-2rem)] anyhive:translate-x-[-50%] anyhive:translate-y-[-50%] anyhive:gap-4 anyhive:rounded-lg anyhive:border anyhive:p-6 anyhive:shadow-lg anyhive:duration-200 anyhive:sm:max-w-lg anyhive:data-[state=open]:animate-in anyhive:data-[state=closed]:animate-out anyhive:data-[state=closed]:fade-out-0 anyhive:data-[state=open]:fade-in-0 anyhive:data-[state=closed]:zoom-out-95 anyhive:data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="anyhive:ring-offset-background anyhive:focus:ring-ring anyhive:data-[state=open]:bg-accent anyhive:data-[state=open]:text-muted-foreground anyhive:absolute anyhive:top-4 anyhive:right-4 anyhive:rounded-xs anyhive:opacity-70 anyhive:transition-opacity anyhive:hover:opacity-100 anyhive:focus:ring-2 anyhive:focus:ring-offset-2 anyhive:focus:outline-hidden anyhive:disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="anyhive:sr-only">Close</span>
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
      className={cn("anyhive:flex anyhive:flex-col anyhive:gap-2 anyhive:text-center anyhive:sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "anyhive:flex anyhive:flex-col-reverse anyhive:gap-2 anyhive:sm:flex-row anyhive:sm:justify-end",
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
      className={cn("anyhive:text-lg anyhive:leading-none anyhive:font-semibold", className)}
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
      className={cn("anyhive:text-muted-foreground anyhive:text-sm", className)}
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
