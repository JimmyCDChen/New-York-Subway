up:
	docker-compose up

down: 
	docker-compose down

build-local-image:
	docker image build -t container-name .

run-local-image:
	docker run -it -p 3000:3000 --name container-name container-name

stop-local-image:
	docker stop container-name
