from django.urls import path

from . import views
urlpatterns = [
    path('allattraction/',views.allData),
    path('allcountries/',views.allCountries),
    path('allcities/',views.allCities)
]
