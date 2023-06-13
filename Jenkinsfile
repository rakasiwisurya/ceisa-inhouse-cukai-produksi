pipeline {
    agent any
    environment {
        PATH = "/usr/local/go/bin:$PATH"
        DOCKER_IMAGE_NAME = "drc01dev01hrbr.customs.go.id/library/microfrontend"
        HARBOR_CREDENTIAL_ID = 'harbor_dev'
        KUBECONFIG_CREDENTIAL_ID = 'kubeconfig_dev01'
        REGISTRY = 'drc01dev01hrbr.customs.go.id'
        HARBOR_NAMESPACE = 'library'
        APP_NAME = 'microfrontend'
        NAMESPACE = 'microfrontend'
		URL_SVC =''
        PORT = '4000'
        CHANGE_CAUSE = 'V.01'
    }

    stages {
		stage ('Checkout SCM') {
            steps {
                checkout(scm)
            }
        }
        stage('Build Docker Image') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    app = docker.build(DOCKER_IMAGE_NAME, "-m 4g .")
                }
            }
        }
        stage('Push Docker Image') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    docker.withRegistry('https://drc01dev01hrbr.customs.go.id', 'harbor_dev') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                        app.push()
                    }
                }
            }
        }
        stage('Deploy To PKS DEV') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    app = docker.build(DOCKER_IMAGE_NAME, "-m 4g .")
                }
            }
        }
        stage('Get Service IP DEV') {
            when {
                branch 'develop'
            }
            steps {
                retry(10) {
                    withCredentials([usernamePassword(credentialsId: 'pks_client_dev', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]) {
                        script {
                            def ip = sh (script: "sshpass -p '$USERPASS' -v ssh -o StrictHostKeyChecking=no $USERNAME@$pks_client_dev \"kubectl -n $NAMESPACE get svc $APP_NAME --output=jsonpath={'.status.loadBalancer.ingress[].ip'}\"", returnStdout: true)
							sh 'sleep 5'
                            echo "IP is ${ip}"
                            URL_SVC = "URL is http://${ip}:$PORT"
                            echo "$URL_SVC"

                            try {
                            } catch (err) {
                             echo: 'caught error: $err'
                            }
                        }
                    }
                }
            }
        }
		stage('Set Annotation') {
            when {
                branch 'develop'
            }
            steps {
                retry(10) {
                    withCredentials([usernamePassword(credentialsId: 'pks_client_dev', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]) {
                        script {
                            def host = sh (script: "sshpass -p '$USERPASS' -v ssh -o StrictHostKeyChecking=no $USERNAME@$pks_client_dev \"kubectl -n $NAMESPACE annotate deployment $APP_NAME kubernetes.io/change-cause=$CHANGE_CAUSE --record=false --overwrite=true\"", returnStdout: true)
                            sh 'sleep 5'

                            try {
                            } catch (err) {
                             echo: 'caught error: $err'
                            }
                        }
                    }
                }
            }
        }
    }
}
