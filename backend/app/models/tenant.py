from datetime import datetime
from enum import Enum

from sqlalchemy import String, UniqueConstraint, func, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

from app.models.material import Material
from backend.app.models.user import User

# Reserved ID for the system tenant.
SYSTEM_TENANT_ID: int = 1

class TenantType(str, Enum):
    SYSTEM = "system"
    USER = "user"

class Tenant(Base):
    __tablename__ = "tenants"
    __table_args__ = (
        UniqueConstraint("slug", name="uq_tenants_slug"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    slug: Mapped[str] = mapped_column(String(100))
    tenant_type: Mapped[TenantType] = mapped_column(String(20), server_default=text("'user'"))
    is_active: Mapped[bool] = mapped_column(server_default=text("true"))

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(server_default=func.now(), onupdate=func.now())

    #relationships

    materials: Mapped[list["Material"]] = relationship("Material", back_populates="tenant")
    users: Mapped[list["User"]] = relationship("User", back_populates="tenant")