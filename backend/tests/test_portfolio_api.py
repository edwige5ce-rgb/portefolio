"""
Backend API tests for EDGS Portfolio
Tests all API endpoints: config, hero, about, services, projects, contact
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://apple-aesthetic-2.preview.emergentagent.com')

@pytest.fixture
def api_client():
    """Shared requests session"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


class TestRootEndpoint:
    """Test root API endpoint"""
    
    def test_root_returns_message(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "EDGS Portfolio API"


class TestConfigEndpoint:
    """Test /api/config endpoint - site configuration"""
    
    def test_config_returns_200(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/config")
        assert response.status_code == 200
    
    def test_config_has_correct_site_name(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/config")
        data = response.json()
        assert data["name"] == "edgs-design.com"
    
    def test_config_has_required_fields(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/config")
        data = response.json()
        required_fields = ["name", "tagline", "description", "email", "phone", "address", "social"]
        for field in required_fields:
            assert field in data, f"Missing field: {field}"
    
    def test_config_social_links(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/config")
        data = response.json()
        assert "social" in data
        assert "instagram" in data["social"]
        assert "linkedin" in data["social"]
        assert "pinterest" in data["social"]


class TestHeroEndpoint:
    """Test /api/hero endpoint - hero section content"""
    
    def test_hero_returns_200(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/hero")
        assert response.status_code == 200
    
    def test_hero_has_required_fields(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/hero")
        data = response.json()
        required_fields = ["title", "subtitle", "description", "scrollText"]
        for field in required_fields:
            assert field in data, f"Missing field: {field}"
    
    def test_hero_title_is_atmospheres(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/hero")
        data = response.json()
        assert data["title"] == "Atmosphères"


class TestAboutEndpoint:
    """Test /api/about endpoint - about section content"""
    
    def test_about_returns_200(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/about")
        assert response.status_code == 200
    
    def test_about_has_required_fields(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/about")
        data = response.json()
        required_fields = ["years", "yearsLabel", "philosophy"]
        for field in required_fields:
            assert field in data, f"Missing field: {field}"


class TestServicesEndpoint:
    """Test /api/services endpoint - services list"""
    
    def test_services_returns_200(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/services")
        assert response.status_code == 200
    
    def test_services_returns_list(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/services")
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 3
    
    def test_services_have_required_fields(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/services")
        data = response.json()
        for service in data:
            assert "title" in service
            assert "description" in service


class TestProjectsEndpoint:
    """Test /api/projects endpoint - projects list"""
    
    def test_projects_returns_200(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
    
    def test_projects_returns_7_projects(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/projects")
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 7
    
    def test_projects_sorted_by_year_ascending(self, api_client):
        """Projects should be sorted oldest (2024) to newest (2026)"""
        response = api_client.get(f"{BASE_URL}/api/projects")
        data = response.json()
        years = [int(p["year"]) for p in data]
        assert years == sorted(years), f"Projects not sorted by year: {years}"
        # First project should be 2024, last should be 2026
        assert data[0]["year"] == "2024"
        assert data[-1]["year"] == "2026"
    
    def test_projects_have_required_fields(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/projects")
        data = response.json()
        required_fields = ["id", "slug", "title", "subtitle", "location", "year", 
                          "category", "heroImage", "description", "features", 
                          "gallery", "colors", "services"]
        for project in data:
            for field in required_fields:
                assert field in project, f"Project {project.get('slug', 'unknown')} missing field: {field}"
    
    def test_projects_have_valid_hero_images(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/projects")
        data = response.json()
        for project in data:
            assert project["heroImage"].startswith("https://"), f"Invalid heroImage URL for {project['slug']}"


class TestProjectBySlugEndpoint:
    """Test /api/projects/{slug} endpoint - individual project"""
    
    def test_project_by_slug_returns_200(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/projects/boulangerie-lulu")
        assert response.status_code == 200
    
    def test_project_by_slug_returns_correct_project(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/projects/boulangerie-lulu")
        data = response.json()
        assert data["slug"] == "boulangerie-lulu"
        assert data["title"] == "Lulu"
        assert data["year"] == "2024"
    
    def test_project_not_found_returns_404(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/projects/non-existent-project")
        assert response.status_code == 404
    
    def test_all_project_slugs_accessible(self, api_client):
        """Test that all project slugs from the list are accessible"""
        slugs = [
            "suite-serenite", "maison-edouard", "boulangerie-lulu",
            "studio-da-tech", "bazar-savant", "n3-horizon", "altitude-aframe"
        ]
        for slug in slugs:
            response = api_client.get(f"{BASE_URL}/api/projects/{slug}")
            assert response.status_code == 200, f"Project {slug} not accessible"


class TestContactEndpoint:
    """Test /api/contact endpoint - contact form submission"""
    
    def test_contact_post_returns_success(self, api_client):
        payload = {
            "name": "TEST_Contact User",
            "email": "test@example.com",
            "phone": "+33123456789",
            "subject": "Test Subject",
            "message": "This is a test message"
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200
    
    def test_contact_returns_created_message(self, api_client):
        payload = {
            "name": "TEST_Another User",
            "email": "another@example.com",
            "phone": "",
            "subject": "Another Test",
            "message": "Another test message"
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        data = response.json()
        assert "id" in data
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["subject"] == payload["subject"]
        assert data["message"] == payload["message"]
        assert "created_at" in data
        assert data["read"] == False
    
    def test_contact_requires_name(self, api_client):
        payload = {
            "email": "test@example.com",
            "subject": "Test",
            "message": "Test"
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422  # Validation error
    
    def test_contact_requires_email(self, api_client):
        payload = {
            "name": "Test",
            "subject": "Test",
            "message": "Test"
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422
    
    def test_contact_requires_subject(self, api_client):
        payload = {
            "name": "Test",
            "email": "test@example.com",
            "message": "Test"
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422
    
    def test_contact_requires_message(self, api_client):
        payload = {
            "name": "Test",
            "email": "test@example.com",
            "subject": "Test"
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422
