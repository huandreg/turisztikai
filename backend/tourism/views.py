from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Attraction
from .serializers import AttractionSerializer 

@api_view(["GET"])
def allData(request):
  if(request.method== "GET"):
    allAttraction = Attraction.objects.all()
    serialized = AttractionSerializer(allAttraction, many=True)
    return Response(serialized.data)