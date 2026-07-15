import uuid
from datetime import datetime
from decimal import Decimal

from sqlalchemy import Column, DateTime, ForeignKey, Numeric, Table, UniqueConstraint, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.db import Base

list_material = Table(
    "list_material",
    Base.metadata,
    Column("list_id", Uuid, ForeignKey("material_list.id", ondelete="CASCADE"), primary_key=True),
    Column("material_id", Uuid, ForeignKey("material.id", ondelete="CASCADE"), primary_key=True)
)

class Material(Base):
    __tablename__="material"
    __table_args__= (UniqueConstraint("user_id", "name", name="uq_material_user_name"))

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    name: Mapped[str]
    price: Mapped[Decimal] = mapped_column(Numeric(10,2))
    metallic_yield: Mapped[float]

    c_pct: Mapped[float]
    si_pct: Mapped[float]
    mn_pct: Mapped[float]
    p_pct: Mapped[float]
    s_pct: Mapped[float]
    cu_pct: Mapped[float]
    ni_pct: Mapped[float]

    sio2_pct: Mapped[float]
    al2o3_pct: Mapped[float]
    cao_pct: Mapped[float]
    mgo_pct: Mapped[float]
    feo_pct: Mapped[float]

    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now)

    lists: Mapped[list["MaterialList"]] = relationship(secondary=list_material, back_populates="materials")

    class MaterialList(Base):
        __tablename__="material_list"
        __table_args__=(UniqueConstraint("user_id", "name", name="uq_material_list_user_name"))

        id: Mapped[Uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
        user_id: Mapped[Uuid.UUID] = mapped_column(index=True)
        name: Mapped[str]
        created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now)

        materials: Mapped[list["Material"]] = relationship(secondary=list_material, back_populates="lists")