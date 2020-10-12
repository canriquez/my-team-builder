

set :myuser,          'ubuntu'
set :branch,        :feat_persistance
set :deploy_to,       "/home/#{fetch(:myuser)}/apps/#{fetch(:application)}"
server '54.157.185.107', user: 'ubuntu', port: 22, roles: [:web, :app, :db], primary: true
set :build_command, 'npm run build'

