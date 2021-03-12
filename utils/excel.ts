import XSLX from 'xlsx'
const { utils } = XSLX
const { json_to_sheet } = utils
import { CompPropertyInterface, OrderInterface } from 'api'
import { formatPercent, formatPrice } from 'utils'

export const buildPropertyInfoWorkbook = (
  data: Array<CompPropertyInterface[]>,
  order: OrderInterface,
  filename: string
) => {
  const wb = utils.book_new()
  const propertyInfoJson = [
    {
      PoolName: order.poolName,
      LoanNumber: order.loanNum,
      ID: order.id,
      Subject: order.address,
      Zip: order.zip,
      Bed: order.bed,
      Bath: order.bath,
      SqFt: order.sqft,
      Garage: order.garage,
      LotSize: order.lotSize,
      YearBuilt: order.year,
      REO: order.reo,
      RestrictComps: '',
      CompsGoingBack: order.compsBack,
      AsOfDate: order.asOfDate
    },
    {
      PoolName: '',
      LoanNumber: '',
      ID: '',
      Subject: '',
      Zip: '',
      Bed: '',
      Bath: '',
      SqFt: '',
      Garage: '',
      LotSize: '',
      YearBuilt: '',
      REO: '',
      RestrictComps: '',
      CompsGoingBack: '',
      AsOfDate: ''
    },
    {
      PoolName: 'Ave Date:',
      LoanNumber: order.rivDate,
      ID: '',
      Subject: '',
      Zip: '',
      Bed: '',
      Bath: '',
      SqFt: '',
      Garage: '',
      LotSize: '',
      YearBuilt: '',
      REO: '',
      RestrictComps: '',
      CompsGoingBack: '',
      AsOfDate: ''
    },
    {
      PoolName: 'Caluclated Price:',
      LoanNumber: order.calculatedPrice + ' ' + '(RETAIL Value)',
      ID: '',
      Subject: '',
      Zip: '',
      Bed: '',
      Bath: '',
      SqFt: '',
      Garage: '',
      LotSize: '',
      YearBuilt: '',
      REO: '',
      RestrictComps: '',
      CompsGoingBack: '',
      AsOfDate: ''
    },
    {
      PoolName: 'Value Per SQFT:',
      LoanNumber: formatPrice(order.sqftPrice),
      ID: '',
      Subject: '',
      Zip: '',
      Bed: '',
      Bath: '',
      SqFt: '',
      Garage: '',
      LotSize: '',
      YearBuilt: '',
      REO: '',
      RestrictComps: '',
      CompsGoingBack: '',
      AsOfDate: ''
    },
    {
      PoolName: '',
      LoanNumber: '',
      ID: '',
      Subject: '',
      Zip: '',
      Bed: '',
      Bath: '',
      SqFt: '',
      Garage: '',
      LotSize: '',
      YearBuilt: '',
      REO: '',
      RestrictComps: '',
      CompsGoingBack: '',
      AsOfDate: ''
    },
    {
      PoolName: 'As is Sale Price',
      LoanNumber: '',
      ID: 'Quick Sale Price',
      Subject: '',
      Zip: '',
      Bed: '',
      Bath: '',
      SqFt: '',
      Garage: '',
      LotSize: '',
      YearBuilt: '',
      REO: '',
      RestrictComps: '',
      CompsGoingBack: '',
      AsOfDate: ''
    },
    {
      PoolName: 'Retail Market:',
      LoanNumber: formatPercent(order.retailMarket),
      ID: 'Distressed Market:',
      Subject: formatPercent(order.distressedMarket),
      Zip: '',
      Bed: '',
      Bath: '',
      SqFt: '',
      Garage: '',
      LotSize: '',
      YearBuilt: '',
      REO: '',
      RestrictComps: '',
      CompsGoingBack: '',
      AsOfDate: ''
    }
  ]

  const wscols = Object.keys(propertyInfoJson[0]).map(col => {
    return {
      width: 20
    }
  })

  const ws = json_to_sheet(propertyInfoJson)
  ws['!cols'] = wscols
  XSLX.utils.book_append_sheet(wb, ws, 'Subject Property')

  data.map((table, i) => {
    // Sheetnames
    const sheetnames = [
      'Sold Properties',
      'Listed Properties',
      'Contract Properties'
    ]

    const columns = [
      'address',
      'city',
      'zip',
      'bed',
      'bath',
      'sqft',
      'garage',
      'lotSize',
      'year',
      'reo',
      'targetDistance',
      'listDate',
      'listPrice',
      'coeDate',
      'soldPrice',
      'actDom',
      'totDom',
      'sqftPrice',
      'valuationPercent'
    ]

    // We create new Json and format headers
    const newJson = table.map(record => {
      const newObj = {}
      for (var key in record) {
        const formatted = key[0].toUpperCase() + key.slice(1)
        if (columns.indexOf(key) > -1) {
          newObj[formatted] = record[key]
        }
      }
      return newObj
    })

    const wscols = columns.map(col => {
      return {
        width: 20
      }
    })

    const ws = json_to_sheet(newJson)
    ws['!cols'] = wscols
    XSLX.utils.book_append_sheet(wb, ws, sheetnames[i])
  })

  XSLX.writeFile(wb, `${filename}.xlsx`)
}
