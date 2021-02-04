import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CompPhotosModal from './CompPhotosModal'

describe('CompPhotosModal', () => {
  let component
  beforeAll(() => {
    const props = {
      closeModal: () => {},
      setCheckedProperties: () => {},
      checkedProperties: [],
      view: 'test',
      properties: [
        {
          actDom: 239,
          address: '62030 Mariam Parkways',
          agSqft: 2205,
          area: 'Default',
          areaParameter: null,
          asOfDate: '5/2/2020',
          basement: 'Full',
          bath: 3,
          bed: 5,
          calculatedPrice: 523921,
          city: 'Antonioville',
          coe2Date: '12/10/2020',
          coe2Price: 573078,
          coeDate: '1/19/2020',
          coePrice: 575108,
          compsGoingBack: '3 months',
          concessions: 16044,
          daysFromFlip: 26,
          description:
            'Aut laudantium ipsum. Ab ea sit quidem. Libero totam ut. Rerum iure rem sit dicta nobis molestiae quo. Quo consequatur ad. Atque beatae error beatae quae. Doloribus aut quisquam inventore nihil aut incidunt maxime est. Deserunt earum neque.',
          distressed: false,
          distressedMarket: 0.8811,
          dnaSource: 'User',
          garage: 1,
          geoAccuracy: 'PREMISE LEVEl. Excellent',
          id: '31130765-5',
          lat: 39.0559,
          listDate: '4/22/2020',
          listPrice: 547804,
          listPricePerSqft: 4460,
          listingNumber: 'MDMC695755',
          listingSheetSelected: false,
          lng: -77.229,
          loanNumber: 'test',
          lock: true,
          lotSize: 0.64,
          marketArea: 'Radian Interactive Value Default - 1 mile',
          order: 1,
          photos: [],
          pool: 'Community',
          poolName: 'DEFAULT',
          propertyType: 'Multi Family',
          reo: true,
          retailMarket: 0.7451,
          rivDate: '7/11/2020',
          schoolDistrict: 'Avon County Public Schools',
          soldPrice: 573875,
          sqft: 2168,
          sqftPrice: 176.18,
          state: 'LA',
          subdivision: 'Soft Table Village',
          summaryComments:
            'Quo nulla iure magnam fuga a id. Nostrum voluptate quaerat velit sed et itaque inventore. Omnis tempore eos. Ea ab harum aut nisi eum est enim. Ut sed aut consequatur deserunt molestias quas doloremque et. Repudiandae expedita laborum suscipit aut dolorum facere. Exercitationem beatae et repudiandae non impedit architecto adipisci.',
          targetDistance: 0.41,
          totDom: 116,
          totalSqft: 2043,
          valuationPercent: 0.56,
          waterfront: 'Water Oriented: No',
          yearBuilt: 2006,
          zip: '57667'
        }
      ]
    }
    component = shallow(<CompPhotosModal {...props} />)
  })
  it('has comp-modal container', () => {
    expect(component.find('#comp-modal')).toHaveLength(1)
    expect(component.find('.comp-photos-modal')).toHaveLength(1)
    expect(component.find('.top-row')).toHaveLength(1)
    expect(component.find('.comp-photo-container')).toHaveLength(1)
  })
  it('two submit buttons', () => {
    expect(component.find('.btn')).toHaveLength(2)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
