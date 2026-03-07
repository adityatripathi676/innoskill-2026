all: build restart status logs

build:
	sh build.sh

restart:
	sudo systemctl restart api

status:
	sudo systemctl status api

logs:
	sudo journalctl -u api --no-pager | tail -n 20
