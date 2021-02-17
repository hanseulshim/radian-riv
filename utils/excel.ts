import XSLX from 'xlsx'
const { utils } = XSLX
const { json_to_sheet } = utils
import { PropertyInterface } from 'api'
import { formatPercent, formatPrice } from 'utils'

export const buildPropertyInfoWorkbook = (
  data: Array<PropertyInterface[]>,
  propertyInfo: PropertyInterface,
  filename: string
) => {
  const wb = utils.book_new()
  const propertyInfoJson = [
    {
      PoolName: propertyInfo.poolName,
      LoanNumber: propertyInfo.loanNumber,
      ID: propertyInfo.id,
      Subject: propertyInfo.address,
      Zip: propertyInfo.zip,
      Bed: propertyInfo.bed,
      Bath: propertyInfo.bath,
      SqFt: propertyInfo.sqft,
      Garage: propertyInfo.garage,
      LotSize: propertyInfo.lotSize,
      YearBuilt: propertyInfo.yearBuilt,
      REO: propertyInfo.reo,
      RestrictComps: '',
      CompsGoingBack: propertyInfo.compsGoingBack,
      AsOfDate: propertyInfo.asOfDate
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
      LoanNumber: propertyInfo.rivDate,
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
      LoanNumber: propertyInfo.calculatedPrice + ' ' + '(RETAIL Value)',
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
      LoanNumber: formatPrice(propertyInfo.sqftPrice),
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
      LoanNumber: formatPercent(propertyInfo.retailMarket),
      ID: 'Distressed Market:',
      Subject: formatPercent(propertyInfo.distressedMarket),
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
      'yearBuilt',
      'reo',
      'targetDistance',
      'listingDate',
      'listingPrice',
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
