import faker from 'faker'
import { formatDate } from 'utils'

export interface MlsSheetInterface {
  listingDetail: {
    status: string
    listDate: string
    soldDate: string
    dom: number
    originalListPrice: number
    finalListPrice: number
    soldPrice: number
    shortSale: string
    financing: string
    financingType: string
    mlsNumber: string
    reo: string
    concessions: number
  }
  address: {
    address: string
    city: string
    county: string
    unit: string
    state: string
    zip: string
  }
  mlsComments: string
  interiorFeatures: string
  additionalFeatures: string
  propertyInformation: {
    propertyType: string
    year: number
    bed: number
    bath: number
    totalSqft: number
    aboveGradeSqft: number
    lotSize: number
    lotSizeSf: number
    lotSizeAc: number
    garageType: string
    subType: string
    numberOfUnits: number
    style: string
    fireplace: string
    sqftSource: string
    stories: number
    garage: number
    parkingSpaces: number
    garageSf: number
    opener: string
  }
  exterior: {
    site: string
    exterior: string
    outbuilding: string
    view: number
    pool: number
    poolDetails: number
    waterFrontage: number
    waterFootage: number
    lotDescription: string
    patioDeck: number
    barnStable: string
    spaHotTub: string
    spaHotTubDetails: string
    dock: string
    waterAccess: string
    guestSf: string
    guestHouse: number
  }
  other: {
    flooring: string
    roofing: string
    basement: string
    basementEntry: string
    belowGradeSqft: number
    belowGradeFinishedSqft: number
    basementFinished: string
    basementFinishedPercent: number
  }
  taxes: {
    projectSubdivision: string
    taxes: number
    taxId: string
    legalDescription: string
    taxYear: number
    zoning: string
    township: string
    section: string
  }
  schools: {
    district: string
    other: string
    highSchool: string
    juniorHigh: string
    elementary: string
    private: string
  }
  hoa: {
    name: string
    fee: number
    contact: string
    hoa: string
    duesFrequency: string
    phone: string
  }
  contact: {
    la: string
    bkr: string
    laEmail: string
    laTel: string
    bkrTel: string
    sa: string
    sBkr: string
    saEmail: string
    saTel: string
    coLa: string
    coLaTel: string
    coBkr: string
    coBkrTel: string
    mgmt: string
    mgmtTel: string
  }
  photos: string[]
}

export const getMlsSheet = async (
  mlsNumber: string
): Promise<MlsSheetInterface> => {
  return {
    listingDetail: {
      status: faker.random.arrayElement(['Sold', 'Listed', 'Under Contract']),
      listDate: formatDate(faker.date.between('2020-01-01', '2020-12-31')),
      soldDate: formatDate(faker.date.between('2020-01-01', '2020-12-31')),
      dom: faker.random.number(50),
      originalListPrice: faker.random.number({ min: 300000, max: 500000 }),
      finalListPrice: faker.random.number({ min: 300000, max: 500000 }),
      soldPrice: faker.random.number({ min: 300000, max: 500000 }),
      shortSale: faker.random.arrayElement(['Yes', 'No']),
      financing: faker.random.arrayElement(['Conventional', 'Unconventional']),
      financingType: null,
      mlsNumber,
      reo: faker.random.arrayElement(['Yes', 'No']),
      concessions: faker.random.number(5000)
    },
    address: {
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      county: faker.address.county(),
      unit: faker.address.secondaryAddress(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode()
    },
    mlsComments: faker.lorem.paragraph(5),
    interiorFeatures: faker.lorem.paragraph(5),
    additionalFeatures: faker.lorem.paragraph(5),
    propertyInformation: {
      propertyType: 'Residential',
      year: 1991,
      bed: 3,
      bath: 3.5,
      totalSqft: 1580,
      aboveGradeSqft: 1280,
      lotSize: 0.05,
      lotSizeSf: 2033,
      lotSizeAc: 0.05,
      garageType: null,
      subType: null,
      numberOfUnits: null,
      style: 'Traditional',
      fireplace: 'Yes',
      sqftSource: 'Assessor',
      stories: null,
      garage: null,
      parkingSpaces: null,
      garageSf: null,
      opener: null
    },
    exterior: {
      site: 'Residential',
      exterior: 'Other',
      outbuilding: 'Other Structures: Above Grade, Below Grade',
      view: 3.5,
      pool: 1580,
      poolDetails: 1280,
      waterFrontage: 0.05,
      waterFootage: 2033,
      lotDescription: 'Sold',
      patioDeck: 29,
      barnStable: 'Traditional',
      spaHotTub: 'Yes',
      spaHotTubDetails: 'Assessor',
      dock: '4/3/2020',
      waterAccess: 'No',
      guestSf: 'Assessor',
      guestHouse: 0.05
    },
    other: {
      flooring: 'Carpet, Hardwood, Tile/Brick',
      roofing: null,
      basement: 'Full',
      basementEntry:
        'Basement Type: Daylight Full, Interior Access, Outside Entrance, Rear Entrance, Walkout Level',
      belowGradeSqft: 340,
      belowGradeFinishedSqft: 300,
      basementFinished: 'Full',
      basementFinishedPercent: 25
    },
    taxes: {
      projectSubdivision: 'Germantown Estates',
      taxes: 3548,
      taxId: null,
      legalDescription: null,
      taxYear: 2020,
      zoning: null,
      township: null,
      section: null
    },
    schools: {
      district: 'Montgomery County Public Schools',
      other: null,
      highSchool: null,
      juniorHigh: null,
      elementary: null,
      private: null
    },
    hoa: {
      name: null,
      fee: 980,
      contact: null,
      hoa: 'Yes',
      duesFrequency: 'Annually',
      phone: '888-888-8888'
    },
    contact: {
      la: 'Andrew Goodman',
      bkr: 'Goodman REALTORs',
      laEmail: 'andrew@goodmanrealtors.com',
      laTel: '240-731-4827',
      bkrTel: '301-984-0100',
      sa: 'Tony Chow',
      sBkr: 'Grand Elm',
      saEmail: 'tonychow@outlook.com',
      saTel: '240-506-1901',
      coLa: null,
      coLaTel: null,
      coBkr: null,
      coBkrTel: null,
      mgmt: null,
      mgmtTel: null
    },
    photos: [
      'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC668232-20190705-18123-Coachmans-Road-1.jpg',
      'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC668232-20190705-18123-Coachmans-Road-2.jpg',
      'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC668232-20190705-18123-Coachmans-Road-3.jpg',
      'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC668232-20190705-18123-Coachmans-Road-4.jpg',
      'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC668232-20190705-18123-Coachmans-Road-5.jpg',
      'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC668232-20190705-18123-Coachmans-Road-6.jpg',
      'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC668232-20190705-18123-Coachmans-Road-7.jpg',
      'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC668232-20190705-18123-Coachmans-Road-8.jpg',
      'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC668232-20190705-18123-Coachmans-Road-9.jpg',
      'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC668232-20190705-18123-Coachmans-Road-10.jpg'
    ]
  }
}
