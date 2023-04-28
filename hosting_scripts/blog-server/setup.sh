echo "A"
tmux new -d -s server "docker-compose up" &
echo "B"
cd ./reverse-proxy
echo "C"
tmux new -d -s proxy "docker-compose up" &
echo "Set up! If containers/tmux didn't start be sure that docker-compose succeeded"
