var express = require('express');
var router = express.Router();

router.get('/partner', (req, res, next) => {
    var title = 'Partner';
    var endpoint = '/api/partner';
    var context = [
        {
            method: 'GET',
            endpoint: '/api/partner',
            description: 'Get all partners',
            results: 'JSON document with {status: status code, results: JSON}'
        },
        {
            method: 'GET',
            endpoint: '/api/partner/:id',
            description: 'Get partner with id of :id',
            results: 'JSON document with {status: status code, results: JSON}'
        },
        {
            method: 'POST',
            endpoint: '/api/partner/add',
            description: 'Add a new partner with input values of {partner_id, name, website, assigned_territory[{name}]',
            results: 'JSON document with {status: status code, results: JSON}'
        },
        {
            method: 'PUT',
            endpoint: '/api/partner/:id',
            description: 'Updates partner with id of :id. Valid input fields are {partner_id, name, website, assigned_territory[{name}]',
            results: 'JSON document with {status: status code, results: JSON}'
        },                
    ]
    res.render('apidoc', {title: title, endpoint: endpoint, context: context});
});

router.get('/pipeline', (req, res, next) => {
    var title = 'Pipeline';
    var endpoint = '/api/pipeline';
    var context = [
        {
            method: 'GET',
            endpoint: '/api/pipeline',
            description: 'Get all pipelines with pipeline_details',
            results: 'JSON document with {status: status code, results: JSON}'
        },
        {
            method: 'GET',
            endpoint: '/api/pipeline/:id',
            description: 'Get pipeline with id of :id with pipeline_details',
            results: 'JSON document with {status: status code, results: JSON}'
        },
        {
            method: 'POST',
            endpoint: '/api/pipeline/add',
            description: 'Add a new pipeline with input values of {pipeline_report_name, pipeline_report_date, active, pipeline_details (Odessey pipeline report csv)}',
            results: 'JSON document with {status: status code, results: JSON}'
        },
        {
            method: 'POST',
            endpoint: '/api/partner/drop',
            description: 'Drops the pipeline table.  Used since pipeline collection can get really large.',
            results: 'JSON document with {status: status code, results: JSON}'
        },                
    ]
    res.render('apidoc', {title: title, endpoint: endpoint, context: context});
});

router.get('/pipeline/find', (req, res, next) => {
    var title = 'Pipeline Find';
    var endpoint = '/api/pipeline/find/pipeline_detail/:field/:search';
    var context = [
        {
            method: 'GET',
            endpoint: '/api/pipeline/find/pipeline_detail/partner name/:search',
            description: 'Get all pipeline details for a partner with Partner Name of search string value',
            results: 'JSON document with {status: status code, results: JSON}'
        },
        {
            method: 'GET',
            endpoint: '/api/pipeline/find/pipeline_detail/qtr/:search',
            description: 'Get all pipeline_details for a qtr of search string value',
            results: 'JSON document with {status: status code, results: JSON}'
        },
    ]
    res.render('apidoc', {title: title, endpoint: endpoint, context: context});
});

router.get('/booking', (req, res, next) => {
    var title = 'Booking';
    var endpoint = '/api/booking';
    var context = [
        {
            method: 'GET',
            endpoint: '/api/booking',
            description: 'Get all bookings with trx details',
            results: 'JSON document with {status: status code, results: JSON}'
        },
        {
            method: 'GET',
            endpoint: '/api/booking/:id',
            description: 'Get booking with id of :id with trx details',
            results: 'JSON document with {status: status code, results: JSON}'
        },
        {
            method: 'POST',
            endpoint: '/api/booking/add',
            description: 'Add a new booking with input values of {booking_date, booking_description, booking_period, active, booking_details (OBIEE booking report csv)}',
            results: 'JSON document with {status: status code, results: JSON}'
        }
    ]
    res.render('apidoc', {title: title, endpoint: endpoint, context: context});
});

module.exports = router;