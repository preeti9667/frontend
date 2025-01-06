'use client'
import React from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../AdminLayout';
export default function MeetingDetails() {
    const router = useRouter()
    const { title } = router.query;
    console.log(title)
  return (
    <AdminLayout>
        <div>{title}</div>
    </AdminLayout>
  )
}
