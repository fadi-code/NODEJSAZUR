#!/bin/bash

# Variables
LOCATION="westus"
RESSOURCEGROUPE="NODEJS"
NAMESTORAGEACCOUNT="Storage1"
MonConteneur="Moncontainer"

# Connexion à Azure
az login

# Création d'un groupe de ressources
az group create --location $LOCATION --name $RESSOURCEGROUPE

# Création d'un compte de stockage
az storage account create --resource-group $RESSOURCEGROUPE --name $NAMESTORAGEACCOUNT --location $LOCATION --sku Standard_LRS --kind StorageV2

# Création d'un conteneur de stockage
az storage container create --account-name $NAMESTORAGEACCOUNT --name $MonConteneur

# Déconnexion d'Azure (optionnel)
az logout




#APIMANAGMENT_CACHE_AUTH_BLOB_BDD_GIT(azur devops)
