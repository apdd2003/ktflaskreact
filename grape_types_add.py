from app import db
from models import GrapeTypes
grape_types=['idal Blanc',
'Seyval Blanc',
'DeChaunac',
'Chambourcin',
'Chardonnay',
'Cabernet Sauvignon',
'Pinot',
'Concord',
'Niagra',
'Delaware',
'Reliance',
'Canadice']

# new_grape_type = []
# for grape_type in grape_types:
#     new_type =GrapeTypes(grape_type=grape_type)
#     new_grape_type.append(new_type)
# db.session.add_all(new_grape_type)
# db.session.commit()
list2 = ['item1', 'item2']
l= [grape_types, list2]
print((l))
