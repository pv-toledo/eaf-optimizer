import uuid
from datetime import datetime
from enum import Enum

from sqlalchemy import Enum as SAEnum, ForeignKey, String, func, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

from app.models.tenant import Tenant
from backend.app.models.heat import Heat

class UserRole(str, Enum):
    ADMIN = "admin"            # manages catalog, users, and full history
    OPERATOR = "operator"      # creates and runs optimization_runs
    VIEWER = "viewer"          # read-only access to history and catalog

class User(Base):
    __tablename__= "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id"))
    full_name: Mapped[str] = mapped_column(String(100))
    role: Mapped[UserRole] = mapped_column(SAEnum(
        UserRole,
        native_enum=False,
        length=20,
        values_callable=lambda x: [e.value for e in x]
    ),
        server_default=text("'operator'")
    )
    is_active: Mapped[bool] = mapped_column(server_default=text("true"))

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(server_default=func.now(), onupdate=func.now())

    # Relationships

    tenant: Mapped["Tenant"] = relationship("Tenant", back_populates="users")
    heats: Mapped[list["Heat"]] = relationship("Heat", back_populates="user")