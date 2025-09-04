import { redirect } from 'next/navigation'

export default async function CAlias({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  redirect(`/checkout/${token}`)
}


