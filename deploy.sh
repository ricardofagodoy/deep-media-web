#!/bin/bash

ng build --configuration production
gcloud app deploy -q
rm -rf dist
