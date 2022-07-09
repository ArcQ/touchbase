from functools import cached_property
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


class PrimaryKeyPaginator(Paginator):
    def page(self, number):
        """Return a Page object for the given 1-based page number."""
        number = self.validate_number(number)
        top = self.last_id - ((number - 1) * self.per_page)
        return self._get_page(self.object_list.filter(pk__lte=top).order_by("-id")[:self.per_page], number, self)

    @cached_property
    def last_id(self):
        """Return the total number of objects, across all pages."""
        return self.object_list.latest('id').id
