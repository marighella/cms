function heroku {
  DIST_DIR=$1
  MASTER_HEAD_SHA=$(git rev-parse --short HEAD)
  mkdir $DIST_DIR
  pushd $DIST_DIR 
    git init
    git remote add heroku git@heroku.com:marighella.git
    git commit -qam "" --allow-empty --allow-empty-message
  popd

  rsync -r ./dist/* $DIST_DIR/

  pushd $DIST_DIR 
    touch index.php
    echo '<?php include_once("index.html"); ?>' > index.php
    git add . -A
    git commit -m "CMS to staging"
    git push -f heroku master
  popd
}

DIST_FOLDER="/tmp/$(LC_CTYPE=C tr -dc 0-9 < /dev/urandom | head -c 20 | xargs | cat)"
TARGET=$1


grunt staging
heroku $DIST_FOLDER
