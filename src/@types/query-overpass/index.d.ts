declare module "query-overpass" {
  interface QueryOptions {
    flatProperties?: boolean,
    overpassUrl?:string,
  }
  
  export default function(query:string, cb:function, options?:QueryOptions)

}