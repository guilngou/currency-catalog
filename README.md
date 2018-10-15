Currency catalog

1.  Display all currencies
    We would like a page where all available currencies are displayed. Only few details should be displayed such as the identifier, the type and the symbol.
    Acceptance criteria:
    A title Available currencies should be displayed All currencies must be displayed on one page
    Each currency must display its identifier, type and symbol You can add border to distinguish each currency
    $ cd currency-catalog
    $ npm install
    $ npm run build
    $ npm run start -- --port=8000
    npm run start -- --port=8000 2. Display currency details

2.  Display currency details
    When selecting a currency from main page, we should be redirected to the currency detail page where all currency attributes should be displayed. A back button should be provided to allow the user to return to the currency list page.
    Acceptance criteria:
    We want a dedicated page to display all currency data
    This page must have for route http://localhost:8000/#/currency/{id} where {id} will be replaced by currency identifier
    When clicking on a currency from the main page, we should be redirected to the detailed page This page should display all attributes and the identifier

3.  Feed from golden source
    In this step you will be asked to get data from a golden source. To do so, you will use OpenFinTech
    API.
    On the main page, you should display all available currencies. When selecting a currency, you should
    get currency detailed information. Acceptance criteria:
    The main page should display the first 200 currencies
    When selecting a currency from the main page, the detailed page should display all data for any of the available currency

Bonus Tasks

Bonus 1. Add pagination
As you can see, there are many currencies. For a more user friendly interface, we will add a pagination to display currencies. By default, 10 currencies per page should be displayed but we should have an

option to select how many currencies to display per page. Acceptance criteria:
Pagination should be displayed at the bottom of the list of currencies
Select box should allow to display 10 (default value), 50 or 100 currencies per page We should have a previous and next button to go from page to page
If we are on the first page, previous button should be disabled
If we are on the last page, next button should be disabled
We should have a button to rewind to the first page or to forward to the last page

Bonus 2. Add filter options Add filter options to find currencies:
by id
by code by name by type
Acceptance criteria:
We should have a text box to search by any field
We should have a select box to specify what to filter on

Bonus 3. Make your UI responsive
Update your current design to make it compatible with mobile and tablet. You can use any libraries if you want.
Acceptance criteria:
On mobile, we should display 2 currencies per row On tablet, we should display 4 currencies per row On desktop, we should display 6 currencies per row
