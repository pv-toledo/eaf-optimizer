# Models are imported here to ensure Alembic can discover them.
# Add each new model as it is created:
# from app.models.material import Material

from app.models.tenant import Tenant
from app.models.material import Material
from app.models.user import User
from app.models.heat import Heat

__all__ = ["Tenant", "Material", "User", "Heat"]