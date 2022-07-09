# helper method that builds url w/ search queries to pass to pagination buttons
from math import floor
from urllib.parse import urlencode

TOO_LONG = 10
FRONT_LEN = 5
LAST_LEN = 1


def url_builder(url, page_num, query_dict):
    query_params = {"page": page_num}
    if query_dict:
        query_dict_copy = query_dict.copy()
        query_dict_copy.__setitem__("page", page_num)
        query_params = query_dict_copy
    url_with_query = url + "?" + urlencode(query_params, safe=",")
    return url_with_query


# helper method to return a pagination page picker object
def create_picker_range(page):
    # create object to be returned with pagination buttons and their urls
    paginator = page.paginator
    page_picker = {
        "first_pages": [],
        "middle_pages": [],
        "last_pages": [],
    }

    page_max = len(paginator.page_range)
    cur_page = page.number - 1

    if page_max - cur_page >= FRONT_LEN + 1:
        for i, page in enumerate(paginator.page_range):
            if i >= cur_page - 1 and i < cur_page + FRONT_LEN - 1:
                page_picker["first_pages"].append(page)
            elif i == cur_page + FRONT_LEN:
                page_picker["middle_pages"].append(page)
            elif i >= (page_max - LAST_LEN) and i <= page_max:
                page_picker["last_pages"].append(page)
    elif page_max > TOO_LONG:
        for i, page in enumerate(paginator.page_range):
            if i > page_max - (FRONT_LEN + 2):
                page_picker["first_pages"].append(page)
    else:
        for page in paginator.page_range:
            page_picker["first_pages"].append(page)

    return page_picker
