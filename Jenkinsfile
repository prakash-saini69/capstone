pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Pulls the latest code from GitHub
                checkout scm
            }
        }
        
        stage('Build & Deploy Containers') {
            steps {
                // Stops any old containers
                bat 'docker-compose down'
                
                // Builds fresh images and starts the new containers in the background
                bat 'docker-compose up -d --build'
            }
        }
    }
    
    post {
        success {
            echo '--- CI/CD Pipeline Completed! Docker Containers are Live! ---'
        }
        failure {
            echo '--- Pipeline Failed! Check the Jenkins logs. ---'
        }
    }
}


