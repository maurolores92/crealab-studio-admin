export type PricingPlanType = {
  id: number;
  title: string
  imgSrc: string
  subtitle: string
  imgWidth?: number
  imgHeight?: number
  currentPlan: boolean
  popularPlan: boolean
  monthlyPrice: number
  planBenefits: string[]
    yearlyPerMonth: number
    yearlyTotal: number

}

export type PricingPlanProps = {
  plan: string
  data?: PricingPlanType
}

export type PricingFaqType = {
  id: string
  answer: string
  question: string
}

export type PricingTableRowType = { feature: string; starter: boolean; pro: boolean | string; enterprise: boolean }

export type PricingTableType = {
  header: { title: string; subtitle: string; isPro?: boolean }[]
  rows: PricingTableRowType[]
}

export type PricingDataType = {
  faq: PricingFaqType[]
  pricingTable: PricingTableType
  pricingPlans: PricingPlanType[]
}
