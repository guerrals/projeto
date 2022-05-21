from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from .models import Vulnerability
from .serializers import VulnerabilitySerializer
from rest_framework.filters import SearchFilter
from rest_framework.decorators import action
from django.db.models.aggregates import Avg, Count
# Create your views here.


class VulnerabilityViewSet(ModelViewSet):
    queryset = Vulnerability.objects.all()
    serializer_class = VulnerabilitySerializer
    # Filtro simples de campo único para filtrar vulnerabilidades.
    filter_backends = (SearchFilter,)
    # Campos que podem ser utilizados no filtro.
    search_fields = ("asset_hostname", "asset_ip_address", "created_at", "modified_at", "vulnerability_cvss",
                     "vulnerability_publication_date", "vulnerability_severity", "vulnerability_title",)

    def create(self, request, *args, **kwargs):
        """Sobrecarrega o método de criação para o recebimento do arquivo
        .csv. Lê e trata os dados dentro do arquivo, separando as informações
        pelos seus respectivos dalimitadores. Daí, para cada conjunto de informação recuperado cria uma instância do objeto 'vulnerability' com as informações e salva no banco.

        Args:
            request (request): Requisição do consumidor da API.

        Returns:
            Return: Objeto de respota HTTP do DRF com mensagem de sucesso.
        """
        csv_file = request.FILES.get("csv_file")
        if csv_file:
            file_data = csv_file.read().decode("utf-8")
            csv_data = file_data.split("\n")

            vulnerability_list = []
            for data in csv_data[1:]:
                fields: list = data.replace(
                    ", ", " ").split(",")
                if fields.__len__() < 2:
                    break

                if fields[4] == "":
                    fields[4] = "0"

                vulnerability_list.append(
                    Vulnerability(
                        asset_hostname=fields[0],
                        asset_ip_address=fields[1],
                        vulnerability_title=fields[2],
                        vulnerability_severity=fields[3],
                        vulnerability_cvss=fields[4], vulnerability_publication_date=fields[5])
                )
            Vulnerability.objects.bulk_create(
                vulnerability_list, batch_size=50)
            return Response({"success": "Tudo certo!"}, status.HTTP_200_OK)
        return Response({"error": "Nenhum arquivo CSV encontrado!"}, status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=False)
    def get_vulnerability_quantity_by_severity(self, request):
        baixo = self.queryset.filter(vulnerability_severity="Baixo").aggregate(
            baixo=Count('id')).get("baixo")
        medio = self.queryset.filter(vulnerability_severity="Médio").aggregate(
            medio=Count('id')).get("medio")
        alto = self.queryset.filter(vulnerability_severity="Alto").aggregate(
            alto=Count('id')).get("alto")
        critico = self.queryset.filter(vulnerability_severity="Crítico").aggregate(
            critico=Count('id')).get("critico")
        return Response(
            [baixo,
             medio,
             alto,
             critico], status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def get_vulnerability_mean_by_severity(self, request):
        media_risco_baixo = self.queryset.filter(vulnerability_severity="Baixo").aggregate(
            baixo=Avg('vulnerability_cvss')).get("baixo")
        media_risco_medio = self.queryset.filter(vulnerability_severity="Médio").aggregate(
            media_risco_medio=Avg('vulnerability_cvss')).get("media_risco_medio")
        media_risco_alto = self.queryset.filter(vulnerability_severity="Alto").aggregate(
            media_risco_alto=Avg('vulnerability_cvss')).get("media_risco_alto")
        media_risco_critico = self.queryset.filter(vulnerability_severity="Crítico").aggregate(
            media_risco_critico=Avg('vulnerability_cvss')).get("media_risco_critico")
        return Response(
            [media_risco_baixo,
             media_risco_medio,
             media_risco_alto,
             media_risco_critico], status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def get_vulnerabilities_quantity(self, request):
        fixed_quantity = self.queryset.filter(
            is_fixed=True).aggregate(fixed=Count("id")).get("fixed")
        return Response(fixed_quantity, status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def get_vulnerability_total_mean(self, request):
        mean_vulnerability = self.queryset.filter(is_fixed=False).aggregate(
            mean=Avg("vulnerability_cvss")).get("mean")
        return Response(mean_vulnerability, status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def get_vulnerability_pending_quantity(self, request):
        mean_vulnerability = self.queryset.filter(is_fixed=False).aggregate(
            quantity=Count("id")).get("quantity")
        return Response(mean_vulnerability, status.HTTP_200_OK)
