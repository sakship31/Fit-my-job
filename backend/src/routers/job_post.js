const express = require('express')
const Job = require('../models/job')
const Org = require('../models/organisation')
const login_required = require('../middleware/org_login_req')
const { json } = require('body-parser')
const multer=require('multer')
const sharp=require('sharp')

const app = new express.Router()