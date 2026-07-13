import { Constraints, Material } from "@/types/domain";


export const defaultMaterials: Material[] = [
    { "name": "Pig iron", "price": 450, "fe": 94.56, "c": 3.8, "si": 1.00, "mn": 0.50, "p": 0.10, "s": 0.04, "cu": 0.01, "ni": 0.03, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.00, "metallic_yield": 94.0 },
    { "name": "HBI (Hot Briquetted Iron)", "price": 400, "fe": 89.45, "c": 2.10, "si": 0.12, "mn": 0.08, "p": 0.04, "s": 0.01, "cu": 0.01, "ni": 0.01, "sio2": 1.50, "al2o3": 0.40, "cao": 0.30, "mgo": 0.50, "feo": 5.50, "metallic_yield": 90.0 },
    { "name": "Cast iron", "price": 330, "fe": 93.80, "c": 3.50, "si": 2.20, "mn": 0.45, "p": 0.07, "s": 0.05, "cu": 0.15, "ni": 0.01, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.00, "metallic_yield": 88.0 },
    { "name": "Obsolete scrap", "price": 220, "fe": 98.37, "c": 0.18, "si": 0.26, "mn": 0.55, "p": 0.05, "s": 0.10, "cu": 0.30, "ni": 0.05, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.18, "metallic_yield": 85.0 },
    { "name": "Turnings", "price": 240, "fe": 97.25, "c": 0.40, "si": 0.20, "mn": 1.10, "p": 0.05, "s": 0.04, "cu": 0.10, "ni": 0.37, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.10, "metallic_yield": 82.0 },
    { "name": "Automotive stamping bundles", "price": 420, "fe": 97.90, "c": 0.05, "si": 0.22, "mn": 0.43, "p": 0.02, "s": 0.01, "cu": 0.10, "ni": 0.03, "sio2": 1.30, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.10, "metallic_yield": 92.0 },
    { "name": "Shredded scrap", "price": 370, "fe": 91.50, "c": 0.28, "si": 0.38, "mn": 0.60, "p": 0.03, "s": 0.04, "cu": 0.30, "ni": 0.08, "sio2": 1.30, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.22, "metallic_yield": 91.0 },
    { "name": "HMS (Heavy Melting Steel)", "price": 350, "fe": 92.00, "c": 0.33, "si": 0.28, "mn": 1.00, "p": 0.03, "s": 0.05, "cu": 0.20, "ni": 0.15, "sio2": 1.30, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.25, "metallic_yield": 88.0 },
]

export const defaultConstraints = [
    "loading_basket_capacity",

    "target_yield",

    "c_min",
    "si_min",
    "mn_min",

    "p_max",
    "s_max",
    "cu_max",
    "ni_max"
]