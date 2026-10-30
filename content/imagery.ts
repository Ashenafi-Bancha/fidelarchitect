/**
 * Atmosphere / reference photography.
 *
 * These are licensed stock photographs (Unsplash License — free for
 * commercial use) used to set the mood of each discipline. They are NOT
 * Fidelity projects, and every placement shows a "Reference image" tag.
 * Replace each entry with real Fidelity photography as it becomes available
 * (set `reference: false` once a photo is genuine company work).
 *
 * Source: https://unsplash.com/photos/<id>
 */

export interface SiteImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  reference: boolean;
  sourceId?: string;
}

const ref = (name: string, alt: string, width: number, height: number, sourceId: string): SiteImage => ({
  src: `/images/reference/${name}.jpg`,
  alt,
  width,
  height,
  reference: true,
  sourceId,
});

export const images = {
  archHouseDusk: ref("arch-house-dusk", "Contemporary two-storey house with timber cladding and glazing, lit at dusk", 2000, 1333, "photo-1600585154340-be6161a56a0c"),
  archFacadeWhite: ref("arch-facade-white", "White angular building facade against a pale sky", 2000, 1333, "photo-1487958449943-2429e8be8625"),
  archTowers: ref("arch-towers", "Looking up at glass high-rise towers under a grey sky", 2000, 1333, "photo-1511818966892-d7d671e672a2"),
  archDrafting: ref("arch-drafting", "Hands drafting an architectural drawing with a pencil and scale ruler", 2000, 1125, "photo-1503387762-592deb58ef4e"),
  archHouseTimber: ref("arch-house-timber", "Modern house with timber and dark cladding volumes", 2000, 1333, "photo-1600566753190-17f0baa2a6c3"),
  archSite: ref("arch-site", "Aerial view of a construction site with engineers in high-visibility vests", 2000, 1333, "photo-1541888946425-d81bb19240f5"),
  intLivingWarm: ref("int-living-warm", "Warm living room with a long sofa, timber coffee table and leather poufs", 2000, 1055, "photo-1618221195710-dd6b41faaea6"),
  intLivingOpen: ref("int-living-open", "Open-plan living space with a timber feature wall and kitchen beyond", 2000, 1360, "photo-1600607687939-ce8a6c25118c"),
  intChair: ref("int-chair", "Yellow upholstered armchair beside a brass floor lamp", 2000, 1765, "photo-1586023492125-27b2c045efd7"),
  intDiningGreen: ref("int-dining-green", "Dining room with green velvet chairs around a white table", 2000, 1125, "photo-1617806118233-18e1de247200"),
  intCabinet: ref("int-cabinet", "Tall oak-veneer cabinet with open shelving", 2000, 3001, "photo-1595428774223-ef52624120d2"),
  intWorkspace: ref("int-workspace", "Bright office lounge with timber glazing frames and soft seating", 2000, 1333, "photo-1524758631624-e2822e304c36"),
  printType: ref("print-type", "Hand-drawn letterform on a tablet beside a printed red booklet", 2000, 3000, "photo-1611532736597-de2d4265fba3"),
  printColour: ref("print-colour", "Designer working with colour swatch cards and a drawing tablet", 2000, 1333, "photo-1572044162444-ad60f128bdea"),
  printPaper: ref("print-paper", "Stacks of printed documents", 2000, 1125, "photo-1562654501-a0ccc0fc3fb1"),
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

export const divisionImagery = {
  architecture: { hero: images.archHouseDusk, secondary: images.archDrafting, detail: images.archFacadeWhite },
  interiors: { hero: images.intLivingWarm, secondary: images.intCabinet, detail: images.intDiningGreen },
  printing: { hero: images.printColour, secondary: images.printType, detail: images.printPaper },
} as const;
