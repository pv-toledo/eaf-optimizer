from datetime import datetime
from enum import Enum

from sqlalchemy import Enum as SAEnum, ForeignKey, String, func, text

from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

class MaterialType(str, Enum):
    SCRAP = "scrap"
    PIG_IRON = "pig_iron"
    HOT_METAL = "hot_metal"

class Material(Base):
    __tablename__="materials"

    id: Mapped[int] = mapped_column(primary_key=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id"))
    name: Mapped[str] = mapped_column(String(100))
    material_type: Mapped[MaterialType] = mapped_column(
        SAEnum(
            MaterialType,
            native_enum=False,
            length=20,
            values_callable=lambda x: [e.value for e in x]
        )
    )

    #Economic fields

    price_usd_per_ton: Mapped[float]
    metallic_yield_pct: Mapped[float]

    #Chemical composition (weight %)

    c_pct: Mapped[float] = mapped_column(default=0.0) #carbon
    mn_pct: Mapped[float] = mapped_column(default=0.0) #manganese
    si_pct: Mapped[float] = mapped_column(default=0.0) #silicon
    s_pct: Mapped[float] = mapped_column(default=0.0) #sulfur
    p_pct: Mapped[float] = mapped_column(default=0.0) #phosphorus
    cu_pct: Mapped[float] = mapped_column(default=0.0) #copper
    cr_pct: Mapped[float] = mapped_column(default=0.0) #chromium

    is_active: Mapped[bool] = mapped_column(server_default=text("true"))

    #timestamps

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(server_default=func.now(), onupdate=func.now())