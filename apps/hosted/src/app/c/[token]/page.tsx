import { redirect } from 'next/navigation'

export default function CAlias({ params }: { params: { token: string } }) {
  redirect(`/checkout/${params.token}`)
}


