# structure
## index.js load fb user
## AppData load profile, products, jobStates
## Layout
## Navbar has Menu, Profile
## Content has Table
# data flow
## fb auth first, get user
## load fb data
### load profile by user.email
### load products by date, category
### load job states by date, category
# data
## date
## category
## stores, which is initially coming from fb profile, and turned on/off by menu, by using setStores
## role, which is coming from fb profile, "warehouse" for warehouse manager, "buyer" for buyer, "store-buyer" for store buyer