import type { MetadataRoute } from 'next';
const routes=['','services','styles','products','projects','process','professionals','upload','about','contact'];
export default function sitemap(): MetadataRoute.Sitemap {return routes.map(r=>({url:`https://www.ashbel-aluminum.co.il/${r}`,lastModified:new Date()}));}
