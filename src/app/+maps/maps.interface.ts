export interface Coordinates {
   lat: number,
   lng: number
}

export interface MapOptionsConfig {
   center?: Coordinates,
   zoom?: number,
   scrollwheel?: boolean,
   zoomControl?: boolean,
   scaleControl?: boolean,
   mapTypeControl?: boolean,
   mapTypeControlOptions?: {
      style?: number,
      position?: number
   }
}

export interface MapPoint {
   readonly city: string,
   readonly growth_from_2000_to_2013: string,
   readonly latitude: number,
   readonly longitude: number,
   readonly population: string,
   readonly rank: string,
   readonly state: string,
   _searchIndex?: string,
   _type?: string,
   _title?: string
}