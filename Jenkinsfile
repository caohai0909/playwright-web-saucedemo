// Jenkinsfile
pipeline {
    agent any
    
    stages {
        stage('Setup') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        
        stage('Smoke Tests') {
            steps {
                sh 'npm run test:smoke'
            }
        }
        
        stage('Critical Tests') {
            when {
                branch 'main'
            }
            steps {
                sh 'npm run test:critical'
            }
        }
        
        stage('Regression Tests') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                sh 'npm test'
            }
        }
    }
    
    post {
        always {
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}


// //  Parallel Stages - Jenkinsfile
// pipeline {
//     agent any
    
//     stages {
//         stage('Setup') {
//             steps {
//                 sh 'npm ci'
//                 sh 'npx playwright install --with-deps'
//             }
//         }
        
//         stage('Parallel Tests') {
//             parallel {
//                 stage('Login Tests') {
//                     steps {
//                         sh 'npm run test:login'
//                     }
//                 }
//                 stage('Products Tests') {
//                     steps {
//                         sh 'npm run test:products'
//                     }
//                 }
//                 stage('Cart Tests') {
//                     steps {
//                         sh 'npm run test:cart'
//                     }
//                 }
//                 stage('Checkout Tests') {
//                     steps {
//                         sh 'npm run test:checkout'
//                     }
//                 }
//             }
//         }
        
//         stage('E2E Tests') {
//             steps {
//                 sh 'npm run test:e2e'
//             }
//         }
//     }
// }