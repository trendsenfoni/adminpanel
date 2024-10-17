"use client"
import React, { useEffect, useState } from 'react'
import { Metadata } from 'next/types'
import pageMeta from '@/lib/meta-info'
import Cookies from 'js-cookie'
import { getItem, getList, postItem } from '@/lib/fetch'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { Switch } from '@/components/ui/switch'
import ButtonLink from '@/components/button-link'
import { MemberType } from '@/types/MemberType'
import Pagination from '@/components/pagination'
import { PaginationType } from '@/types/PaginationType'
export default function MemberListPage() {
  const [admintoken, setAdmintoken] = useState('')
  const { toast } = useToast()
  const [list, setList] = useState<MemberType[]>([])
  const [pagination, setPagination] = useState<PaginationType>({ pageCount: 0, page: 1, pageSize: 4, totalDocs: 0 })
  const load = (pageNo: number) => {
    getList(`/admin/members?pageSize=${pagination.pageSize}&page=${pageNo}`, admintoken)
      .then(result => {
        setList(result.docs as MemberType[])
        setPagination(result as PaginationType)
      })
      .catch(err => toast({ title: 'error', description: err || '', variant: 'destructive' }))
  }
  useEffect(() => { !admintoken && setAdmintoken(Cookies.get('admintoken') || '') }, [])
  useEffect(() => { admintoken && load(1) }, [admintoken])

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-3xl ms-2'>Üyeler</h1>
      <hr />
      <Table className=''>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader >
          <TableRow >
            <TableHead className="">Member</TableHead>
            <TableHead colSpan={2}>Email</TableHead>
            <TableHead className="text-center w-12">#</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {list.map(e => (
            <TableRow key={e._id}>
              <TableCell className="font-medium">{e.fullName}</TableCell>
              <TableCell colSpan={2}>{e.email}</TableCell>
              <TableCell className="text-center">
                <Button variant={'outline'}
                  onClick={() => alert(e.email)}
                >
                  <i className="fa-solid fa-edit"></i>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className='bg-transparent'>
          <TableRow className=' hover:bg-transparent'>
            <TableCell colSpan={4} >
              <Pagination pagination={pagination} onPageClick={(pageNo: number) => {
                setPagination({ ...pagination, page: pageNo })
                load(pageNo)
              }} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

