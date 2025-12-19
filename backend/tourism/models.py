from django.db import models

# Create your models here.

class Country(models.Model):
  attractionCountry = models.CharField(max_length=60, unique=True)

  def __str__(self):
    return self.attractionCountry
  class Meta:
    verbose_name_plural =  "Countries" # admin felületen többes szám

class City(models.Model):
  attractionCity = models.CharField(max_length=60)
  attractionCountry = models.ForeignKey(Country,on_delete=models.CASCADE,)

  def __str__(self):
    return self.attractionCity
  class Meta:
    verbose_name_plural = "Cities"

class Attraction(models.Model):
  name = models.CharField(max_length=80)
  attractionCity = models.ForeignKey(City, on_delete=models.CASCADE,)  
  address = models.CharField(max_length=150)
  openingHours = models.CharField(max_length=100)
  description = models.CharField(max_length=500)  
  attractionImage = models.ImageField(upload_to="")

  rate05 = models.IntegerField(default=0)
  rate10 = models.IntegerField(default=0)
  rate15 = models.IntegerField(default=0)
  rate20 = models.IntegerField(default=0)
  rate25 = models.IntegerField(default=0)
  rate30 = models.IntegerField(default=0)
  rate35 = models.IntegerField(default=0)
  rate40= models.IntegerField(default=0)
  rate45 = models.IntegerField(default=0)
  rate50 =  models.IntegerField(default=0)

  
  def __str__(self):
    return self.name


