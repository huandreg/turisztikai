from django.urls import path

from . import views
urlpatterns = [
    path('allattraction/',views.allData),
    path('allcountries/',views.allCountries),
    path('allcities/',views.allCities),
    
    path('allattraction/delete/<int:attractionId>', views.deleteAttraction),

    path('allattraction/rate/<int:attractionId>', views.newRating)
]
