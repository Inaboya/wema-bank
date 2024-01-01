import { IMeta } from '../utils/common'

interface Icolumn {
  header: string
  accessor: string
  type: string
}

export type TableProps = {
  column: Icolumn[]
  paginate?: boolean
  totalCount?: number
  setPage?: React.Dispatch<React.SetStateAction<any>>
  loading?: boolean
  success?: boolean
  data: any
  handleRowClick?: (row: any) => void
  handlePaginate?: (value: number) => void
  getSelected?: any
  sortHeader?: boolean
  hasMore?: boolean
  hasNext?: boolean
  hasPrev?: boolean
  handleActionClick?: (action: any, row: any) => void
  pageSize?: number
  currentPage?: number
  isFiltered?: boolean
  isLoadingAction?: boolean
  meta?: IMeta
}
