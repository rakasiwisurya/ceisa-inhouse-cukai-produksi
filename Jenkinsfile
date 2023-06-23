pipeline {
    agent any
    environment {
        PATH = "/usr/local/go/bin:$PATH"
        DOCKER_IMAGE_NAME = "drc01dev01hrbr.customs.go.id/library/microfrontend-cukai-produksi"
        HARBOR_CREDENTIAL_ID = 'harbor_dev'
        KUBECONFIG_CREDENTIAL_ID = credentials('kubeconfig_dev01')
        REGISTRY = 'drc01dev01hrbr.customs.go.id'
        HARBOR_NAMESPACE = 'library'
        APP_NAME = 'microfrontend-cukai-produksi'
        NAMESPACE = 'microfrontend'
		URL_SVC =''
        PORT = '4000'
        CHANGE_CAUSE = 'V.01'
        YAML_FILE = 'kubernetes.yaml'
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
                //script {
                //    app = docker.build(DOCKER_IMAGE_NAME, "-m 4g .")
                //}
                sh "cat $KUBECONFIG_CREDENTIAL_ID > kubeconfig-file"
                sh "envsubst < $YAML_FILE | kubectl apply -f - --kubeconfig $KUBECONFIG_CREDENTIAL_ID"
            }
        }

        
        stage('Get Service IP') {
            when {
                branch 'develop'
            }
            steps {
                //milestone(1)
                retry(10) {
                        script {
                            //untuk loadbalancer
                            def ip = sh (script: "kubectl -n '$NAMESPACE' get svc '$APP_NAME' --output=jsonpath={.status.loadBalancer.ingress[].ip} --kubeconfig kubeconfig-file", returnStdout: true)
                        sh 'sleep 5'

                            //untuk loadbalancer
                            echo "IP is ${ip}"
                            URL_SVC = "URL is http://${ip}:$PORT"
                            echo "$URL_SVC"

                            try {
                             //echo sh(script: "sshpass -p '$USERPASS' -v ssh -o StrictHostKeyChecking=no $USERNAME@$kube-master-ip ls -la", returnStdout: true)
                             //sh "sshpass -p '$USERPASS' -v ssh -o StrictHostKeyChecking=no $USERNAME@$kube-master-ip \"/usr/bin/touch /tmp/jenkins\""
                            } catch (err) {
                             echo: 'caught error: $err'
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
                //milestone(1)
                retry(10) {
                        script {
                            //untuk loadbalancer
                            //untuk ingress
                            //def host = sh (script: "sshpass -p '$USERPASS' -v ssh -o StrictHostKeyChecking=no $USERNAME@$pks_client \"kubectl annotate deployment simplereact -n default kubernetes.io/change-cause=testfromjenkins --record=false --overwrite=true\"", returnStdout: true)
                            def host = sh (script: "kubectl annotate deploy $APP_NAME kubernetes.io/change-cause=$CHANGE_CAUSE --record=false --overwrite=true -n $NAMESPACE --kubeconfig kubeconfig-file", returnStdout: true)

                            sh 'sleep 5'
                            sh "rm -f kubeconfig-file"
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
