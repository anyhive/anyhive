import { redirect } from 'next/navigation'

export default function PAlias({ params }: { params: { token: string } }) {
  redirect(`/portal/${params.token}`)
}


