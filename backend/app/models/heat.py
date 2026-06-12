import uuid
from datetime import datetime
from enum import Enum

from sqlalchemy import Enum as SAEnum, ForeignKey, String, func, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from backend.app.models.tenant import Tenant
from backend.app.models.user import User

class HeatStatus(str, Enum):
    PENDING = "pending"           # created, solver not yet executed
    COMPLETED = "completed"       # LP solved — feasible solution found
    INFEASIBLE = "infeasible"     # LP solved — no valid blend exists for constraints

class Heat(Base):
    __tablename__ = "heats"

    id: Mapped[int] = mapped_column(primary_key=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id"))
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))

    name: Mapped[str | None] = mapped_column(String(100))

    status: Mapped[HeatStatus] = mapped_column(
        SAEnum(
            HeatStatus,
            native_enum=False,
            length=20,
            values_callable=lambda x: [e.value for e in x],
        ),
        server_default=text("'pending'"),
    )

    target_weight_ton: Mapped[float]

    # Chemical constraints for the target steel grade (LP constraints)
    # max_cu_pct is always required — without it the optimizer has no guard against the primary tramp element and the result is invalid

    max_cu_pct: Mapped[float]
    max_p_pct: Mapped[float | None]
    max_s_pct: Mapped[float | None]
    min_c_pct: Mapped[float | None]
    max_c_pct: Mapped[float | None]

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    # heats are immutable after creation

    # Relationships
    tenant: Mapped["Tenant"] = relationship("Tenant", back_populates="heats")
    user: Mapped["User"] = relationship("User", back_populates="heats")