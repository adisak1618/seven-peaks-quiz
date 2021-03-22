import axios from 'axios';

interface GuardianPropsType {
  pageSize?: number
  showFields?: string
  orderBy?: string
  q?: string
}

interface GuardianSectionPropsType extends GuardianPropsType {
  section: string
}

interface GuardianContentPropsType extends GuardianPropsType {
  id: string
}

export const GuardianSearch = async ({ pageSize = 10, showFields = '', orderBy = 'newest', q }: GuardianPropsType) => {
  let searchConfig = {}
  if (['newest', 'oldest'].indexOf(orderBy) >= 0) {
    searchConfig = { 'order-by': orderBy }
  }
  if (q !== undefined) {
    searchConfig = { ...searchConfig, q }
  }
  return await axios.get('http://content.guardianapis.com/search', {
    params: {
      'api-key': process.env.API_KEY,
      'page-size': pageSize,
      'show-fields': showFields,
      ...searchConfig
    },
  })
}

export const GuardianSection = async ({ section, pageSize = 10, showFields = '' }: GuardianSectionPropsType) => {
  return await axios.get(`http://content.guardianapis.com/${section}`, {
    params: {
      'api-key': process.env.API_KEY,
      'page-size': pageSize,
      'show-fields': showFields
    },
  })
}

export const GuardianContent = async ({ id, showFields }: GuardianContentPropsType) => {
  return await axios.get(`http://content.guardianapis.com/${id}`, {
    params: {
      'api-key': process.env.API_KEY,
      'show-fields': showFields,
      'show-elements': 'all'
    },
  })
}