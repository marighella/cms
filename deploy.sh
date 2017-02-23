grunt staging
tar -zcvf dist_to_stage.tar.gz ./dist
scp dist_to_stage.tar.gz ratox@dev.marighella.io:~/
ssh ratox@dev.marighella.io 'bash -s' < remote_deploy.sh
